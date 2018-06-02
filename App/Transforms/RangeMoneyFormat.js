import MoneyFormat from './MoneyFormat'

export default (price, separator = ' ~ ') => {
  return MoneyFormat(price[0]) + separator + MoneyFormat(price[1])
}
