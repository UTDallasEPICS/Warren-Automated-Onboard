FROM --platform=linux/arm64 node:alpine
COPY ./backend /
EXPOSE 5001
CMD ["node", "index.js"]
