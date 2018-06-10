import MoneyFormat from './MoneyFormat'

export default (price, priceRange, separator = ' ~ ') => {
  return MoneyFormat(price) + separator + MoneyFormat(priceRange)
}
