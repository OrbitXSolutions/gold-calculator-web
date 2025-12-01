# Gold Calculator Web

Educational gold calculator plus knowledge hub with blog and admin content management.

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=https://api.goldchecker.ae/api
NEXT_PUBLIC_AUTH_LOGIN_PATH=Auth/login
```

Note: `/v1` was removed from the base; endpoints now resolve like `https://api.goldchecker.ae/api/blogs` and auth at `https://api.goldchecker.ae/api/Auth/login`.

Admin JWT tokens are stored in `localStorage` after pasting them on `/admin/login`.

## Blog Feature

- List: `/blog` (search, pagination, badges for categories & tags).
- Detail: `/blog/[slug]` (Markdown rendering, read time, comments).
- Components: `BlogCard`, `Badge`, `Pagination`, `SearchBar`, `MarkdownRenderer`, `CommentForm`, `CommentList`.
- Read time estimation via `estimateReadMinutes`.

## Admin Panel

Client-guarded (token presence) layout at `/admin`.

Sections:
- Blogs: list, create, edit, publish/unpublish.
- Categories: create + list.
- Tags: create + list.
- Comments: per-blog moderation (enter Blog GUID) with soft/hard delete.

Login Page: `/admin/login` – paste JWT; replace with real auth later.

## API Integration

Wrapper functions in `lib/api.ts` map to backend endpoints. Errors normalized with `status`, `code`, `details` when possible.

## Running

```bash
npm install
npm run dev
```

Ensure the API base URL is reachable; otherwise list/detail pages show empty or fail quietly.

## Future Improvements

- Real auth/session management.
- Optimistic UI + client-side refresh after create/update.
- Global comments moderation if backend endpoint added.
- Rich markdown editor & image upload.
- Server-side validation of admin actions.