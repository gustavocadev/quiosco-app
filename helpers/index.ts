const formatMoney = (amount: number, code: string) => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: code,
  })
}

export { formatMoney }
