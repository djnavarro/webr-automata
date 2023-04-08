function(str = NULL) {

  # parameters
  linebreak <- "<br>"
  n_rows <- 30
  n_cols <- 60

  # use string input to create matrix, or create randomly
  if(is.null(str)) {
    symbols <- c("░" ,"▒", "▓", "█")
    dat <- matrix(sample(symbols, n_rows * n_cols, TRUE), n_rows, n_cols)
  } else {
    str <- gsub(linebreak, "", str, fixed = TRUE)
    dat <- matrix(strsplit(str, "")[[1]], n_rows, n_cols)
  }
  
  # run simple automaton
  for(i in 1:10000) {
    r <- sample(2:(n_rows-1), 1)
    c <- sample(2:(n_cols-1), 1)
    h <- sample(-1:1, 1)
    v <- sample(-1:1, 1)
    dat[r+v, c+h] = dat[r, c]
  }

  # convert to string and return 
  str <- ""
  for(i in 1:n_rows) {
    row <- paste(dat[i, ], collapse="")
    str <- paste(str, row, sep = linebreak)
  }
  str <- paste(str, linebreak, sep = "")
  str
}
