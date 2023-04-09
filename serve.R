# script to serve the page locally at http://127.0.0.1:8081/
library(httpuv)
runServer(host = "127.0.0.1", port = 8081,
  app = list(
    staticPaths = list(
      "/" = staticPath(
        ".",
        headers = list(
          "Cross-Origin-Opener-Policy" = "same-origin",
          "Cross-Origin-Embedder-Policy" = "require-corp"
        )
      )
    )
  )
)
