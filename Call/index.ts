export interface Call<Fun, Args extends unknown[]> {
  fun: Fun
  args: Args
}
