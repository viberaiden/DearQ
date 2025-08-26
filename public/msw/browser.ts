import { setupWorker } from "msw/browser"
import { handlers } from "./handlers"

export const worker = setupWorker(...handlers)

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  worker
    .start({
      onUnhandledRequest: "bypass",
    })
    .then(() => {
      console.log("[v0] MSW worker 자동 시작 완료")
    })
    .catch((err) => {
      console.error("[v0] MSW worker 자동 시작 실패:", err)
    })
}
