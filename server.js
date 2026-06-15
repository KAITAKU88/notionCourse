console.error(
  '\n❌ server.js không còn được dùng (đã chuyển sang Cloudflare Workers).\n\n' +
    '  Chạy local:  npm run dev\n' +
    '  Deploy:      npm run deploy\n\n' +
    '  Landing page: public/index.html\n'
);
process.exit(1);
