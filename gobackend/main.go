package main

import "fmt"

func concat(st1 string, st2 string) string {
	return st1 + st2
}

func text(st3 string) func(param string) {
  return func(param string){
    fmt.Println("Bro here me out " + st3 + param)
  }
}

func main() {
  fn := text("you won't believe it but")

  fn(" I'm dying")

}
