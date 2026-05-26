import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "pi-finder",
  brand: {
    displayName: "Pi 외우기", // 화면에 노출될 앱의 한글 이름으로 바꿔주세요.
    primaryColor: "#f7f4e3", // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
    icon: "https://static.toss.im/appsintoss/44635/9b3043ef-b93b-4d4b-9a52-337360de2fe1.png", // 화면에 노출될 앱의 아이콘 이미지 주소로 바꿔주세요.
  },
  web: {
    host: "localhost",
    port: 5173,
    commands: {
      dev: "vite dev",
      build: "vite build",
    },
  },
  permissions: [],
  outdir: "dist",
});
