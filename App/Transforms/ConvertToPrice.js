import MoneyFormat from './MoneyFormat'
import RangeMoneyFormat from './RangeMoneyFormat';

export default (data, separator = ' ~ ') => {
  if (data.priceRange !== '') {
    return RangeMoneyFormat(data.price, data.priceRange, separator)
  } else {
    return MoneyFormat(data.price)
  }
}
