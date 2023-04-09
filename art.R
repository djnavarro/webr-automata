make_art <- function(str = NULL) {

  # parameters used in the art
  linebreak <- "<br>"
  n_rows <- 30
  n_cols <- 100
  symbols <- c("░", "▒", "▓", "█")

  # create random string if none is given
  if(is.null(str)) {
    str <- sample(symbols, n_rows * n_cols, TRUE)
    str <- paste(str, collapse = "")
  }

  # make matrix from (possibly break-delimited) string
  str <- gsub(pattern = linebreak, replacement = "", x = str, fixed = TRUE)
  dat <- matrix(strsplit(str, "")[[1]], n_rows, n_cols, byrow = TRUE)

  # run simple automaton
  for(i in 1:500) {
    r <- sample(2:(n_rows-1), 1)
    c <- sample(2:(n_cols-1), 1)
    h <- sample(-1:1, 1)
    v <- sample(-1:1, 1)
    dat[r+v, c+h] = dat[r, c]
  }

  # convert matrix to string and return 
  str <- ""
  for(i in 1:n_rows) {
    row <- paste(dat[i, ], collapse="")
    str <- paste(str, row, sep = linebreak)
  }
  str <- paste(str, linebreak, sep = "")
  str
}

make_art