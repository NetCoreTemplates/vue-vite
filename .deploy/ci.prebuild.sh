sed -i "s/\$DEPLOY_API/${deploy_api}/g" ./ui/vite.config.ts
[[ -f ./ui/post.build.js ]] && sed -i "s/\$DEPLOY_API/${deploy_api}/g;s/\$DEPLOY_CDN/${deploy_cdn}/g" ./ui/post.build.js
