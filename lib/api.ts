import { BlogCreateDto, BlogDto, BlogListQuery, BlogUpdateDto, CategoryDto, CommentDto, CommentListQuery, PagedResult, StandardErrorResponse, TagDto, enhancePagedResult } from "../types/blog";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://your-domain.com/api/v1"; // fallback

// Internal: build URL with query params
function buildUrl(path: string, params?: Record<string, any>): string {
  // ensure we don't end up with double slashes
  const normalized = path.replace(/^\//, "");
  const url = new URL(normalized, BASE_URL.endsWith("/") ? BASE_URL : BASE_URL + "/");
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v === undefined || v === null || v === "") return;
      url.searchParams.append(k, String(v));
    });
  }
  return url.toString();
}

// Placeholder auth token retrieval. Adjust to real auth mechanism.
function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

function authHeaders(): HeadersInit {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.ok) {
    if (res.status === 204) return undefined as unknown as T; // No Content
    return res.json() as Promise<T>;
  }
  let errorBody: StandardErrorResponse | undefined;
  try {
    errorBody = await res.json();
  } catch {
    /* swallow */
  }
  const message = errorBody?.error?.message || `Request failed (${res.status})`;
  const err = new Error(message) as Error & { details?: any; status?: number; code?: string };
  err.status = res.status;
  err.code = errorBody?.error?.code;
  err.details = errorBody?.error?.details;
  throw err;
}

// --- Blog endpoints ---
export async function getBlogs(query: BlogListQuery = {}): Promise<PagedResult<BlogDto>> {
  try {
    const url = buildUrl("blogs", query);
    const res = await fetch(url, { next: { revalidate: 60 } });
    const data = await handleResponse<PagedResult<BlogDto>>(res);
    return enhancePagedResult(data);
  } catch (err) {
    // Return empty result on network failure for public UI resilience
    return enhancePagedResult({ page: query.page ?? 1, pageSize: query.pageSize ?? 10, totalCount: 0, items: [] });
  }
}

export async function getBlogById(id: string): Promise<BlogDto> {
  const url = buildUrl(`blogs/${id}`);
  const res = await fetch(url, { next: { revalidate: 300 } });
  return handleResponse<BlogDto>(res);
}

export async function getBlogBySlug(slug: string): Promise<BlogDto> {
  const url = buildUrl(`blogs/slug/${slug}`);
  const res = await fetch(url, { next: { revalidate: 300 } });
  return handleResponse<BlogDto>(res);
}

export async function createBlog(input: BlogCreateDto): Promise<BlogDto> {
  const url = buildUrl("blogs");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(input),
  });
  return handleResponse<BlogDto>(res);
}

export async function updateBlog(id: string, input: BlogUpdateDto): Promise<BlogDto> {
  const url = buildUrl(`blogs/${id}`);
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(input),
  });
  return handleResponse<BlogDto>(res);
}

export async function publishBlog(id: string): Promise<BlogDto> {
  const url = buildUrl(`blogs/${id}/publish`);
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ publish: true }),
  });
  return handleResponse<BlogDto>(res);
}

export async function unpublishBlog(id: string): Promise<BlogDto> {
  const url = buildUrl(`blogs/${id}/unpublish`);
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ unpublish: true }),
  });
  return handleResponse<BlogDto>(res);
}

export async function deleteBlog(id: string): Promise<void> {
  const url = buildUrl(`blogs/${id}`);
  const res = await fetch(url, {
    method: "DELETE",
    headers: authHeaders(),
  });
  await handleResponse<void>(res);
}

// --- Comments ---
export async function getComments(blogId: string, query: CommentListQuery = {}): Promise<PagedResult<CommentDto>> {
  const url = buildUrl(`blogs/${blogId}/comments`, query);
  const res = await fetch(url, { next: { revalidate: 30 } });
  const data = await handleResponse<PagedResult<CommentDto>>(res);
  return enhancePagedResult(data);
}

export async function postComment(blogId: string, content: string): Promise<CommentDto> {
  const url = buildUrl(`blogs/${blogId}/comments`);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ content }),
  });
  return handleResponse<CommentDto>(res);
}

export async function deleteComment(commentId: string, hard = false): Promise<void> {
  const url = buildUrl(`comments/${commentId}`, hard ? { hard: true } : undefined);
  const res = await fetch(url, { method: "DELETE", headers: authHeaders() });
  await handleResponse<void>(res);
}

// List all comments (optionally filtered by blogId) paginated
export async function listComments(query: { page?: number; pageSize?: number; blogId?: string } = {}): Promise<PagedResult<CommentDto>> {
  const params: Record<string, any> = {
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 20,
  };
  if (query.blogId) params.blogId = query.blogId;
  const url = buildUrl("comments", params);
  try {
    const res = await fetch(url, { headers: { ...authHeaders() }, next: { revalidate: 10 } });
    const data = await handleResponse<PagedResult<CommentDto>>(res);
    // Normalize/enhance if backend supplies basic shape
    if ((data as any).items && Array.isArray((data as any).items)) {
      return enhancePagedResult(data);
    }
    // Fallback: assume array of comments returned
    if (Array.isArray(data)) {
      const arr = data as unknown as CommentDto[];
      return enhancePagedResult({ page: params.page, pageSize: params.pageSize, totalCount: arr.length, items: arr });
    }
    return enhancePagedResult({ page: params.page, pageSize: params.pageSize, totalCount: 0, items: [] });
  } catch {
    return enhancePagedResult({ page: params.page, pageSize: params.pageSize, totalCount: 0, items: [] });
  }
}

// Update comment content (generic moderation/edit)
export async function updateComment(commentId: string, content: string): Promise<CommentDto> {
  const url = buildUrl(`comments/${commentId}`);
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ content }),
  });
  return handleResponse<CommentDto>(res);
}

// --- Categories ---
export async function getCategories(): Promise<CategoryDto[]> {
  // Try lowercase then PascalCase to handle backend casing differences.
  const variants = ["categories", "Categories"];
  for (const v of variants) {
    try {
      const url = buildUrl(v);
      const res = await fetch(url, {
        next: { revalidate: 120 },
        headers: { ...authHeaders() },
      });
      if (!res.ok) continue; // try next variant
      return await handleResponse<CategoryDto[]>(res);
    } catch (err) {
      // continue to next variant
    }
  }
  return [];
}

export async function createCategory(name: string, parentCategoryId?: string | null): Promise<CategoryDto> {
  const url = buildUrl("categories");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ name, parentCategoryId: parentCategoryId ?? null }),
  });
  return handleResponse<CategoryDto>(res);
}

export async function updateCategory(id: string, name: string, parentCategoryId?: string | null): Promise<CategoryDto> {
  const url = buildUrl(`categories/${id}`);
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ name, parentCategoryId: parentCategoryId ?? null }),
  });
  return handleResponse<CategoryDto>(res);
}

export async function deleteCategory(id: string): Promise<void> {
  const url = buildUrl(`categories/${id}`);
  const res = await fetch(url, { method: "DELETE", headers: authHeaders() });
  await handleResponse<void>(res);
}

// --- Tags ---
export async function getTags(): Promise<TagDto[]> {
  const url = buildUrl("tags");
  const res = await fetch(url, { next: { revalidate: 600 } });
  return handleResponse<TagDto[]>(res);
}

export async function createTag(name: string): Promise<TagDto> {
  const url = buildUrl("tags");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ name }),
  });
  return handleResponse<TagDto>(res);
}

export async function updateTag(id: string, name: string): Promise<TagDto> {
  const url = buildUrl(`tags/${id}`);
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ name }),
  });
  return handleResponse<TagDto>(res);
}

export async function deleteTag(id: string): Promise<void> {
  const url = buildUrl(`tags/${id}`);
  const res = await fetch(url, { method: "DELETE", headers: authHeaders() });
  await handleResponse<void>(res);
}

// --- Media ---
export interface MediaDto {
  id: string;
  fileName: string;
  contentType: string;
  sizeBytes: number;
  url: string;
  uploadedUtc?: string;
}

// Upload a single file (multipart/form-data)
export async function uploadMedia(file: File): Promise<MediaDto> {
  const url = buildUrl("Media"); // Swagger shows /api/Media
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(url, {
    method: "POST",
    headers: { ...authHeaders() },
    body: form,
  });
  return handleResponse<MediaDto>(res);
}

export async function getMedia(id: string): Promise<MediaDto> {
  const url = buildUrl(`Media/${id}`);
  const res = await fetch(url, { headers: { ...authHeaders() }, next: { revalidate: 300 } });
  return handleResponse<MediaDto>(res);
}

export async function deleteMedia(id: string): Promise<void> {
  const url = buildUrl(`Media/${id}`);
  const res = await fetch(url, { method: "DELETE", headers: { ...authHeaders() } });
  await handleResponse<void>(res);
}

// --- Optional advanced endpoint ---
export async function regenerateSlug(id: string, strategy: "fromTitle" = "fromTitle"): Promise<BlogDto> {
  const url = buildUrl(`blogs/${id}/regenerate-slug`);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ strategy }),
  });
  return handleResponse<BlogDto>(res);
}

// Utility: estimate read time (to move to separate file later if desired)
export function estimateReadMinutes(content: string, wordsPerMinute = 220): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function formatDate(iso: string | null | undefined, locale = "en-US"): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}

// --- Auth ---
export interface LoginResponse {
  userId: string;
  userName: string;
  displayName: string;
  accessToken: string;
  refreshToken?: string;
  expiresUtc?: string;
}

const AUTH_LOGIN_PATH = process.env.NEXT_PUBLIC_AUTH_LOGIN_PATH || "auth/login";

export async function loginWithPassword(identifier: string, password: string): Promise<LoginResponse> {
  const url = buildUrl(AUTH_LOGIN_PATH);
  const body = { userNameOrEmail: identifier, password };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse<LoginResponse>(res);
}
