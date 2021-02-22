import { useSelector, useDispatch } from 'react-redux';
import { removeLoan, loansSelector } from './loansSlice';
import { localeCurrency, localePercent } from '../../shared/utilities';
import LoanForm from '../LoanForm';

function Loans() {
  const loans = useSelector(loansSelector);
  const dispatch = useDispatch();

  const totalAmount = function() {
    return loans.reduce((sum, loan) => sum + loan.amount, 0);
  }

  const totalFee = function() {
    return loans.reduce((total, loan) => total + loan.fee, 0);
  }

  // multiplies each loan amount with their APR, sums them together,
  // and divides that by the total loan amount
  const totalAPR = function() {
    if (!totalAmount()) return 0;

    // note that the values in this array is not representative of what the *actual* value would be,
    // as it uses the percent-number (i.e. 5.2) instead of the actual rate (0.052), but as we're
    // only interested in the total percent-number here, converting the rate back and forth would
    // just be an unnecessary extra calculation (and more prone to rounding errors...)
    const values = loans.map(loan => loan.amount * loan.apr);

    return values.reduce((a, b) => a + b, 0) / totalAmount();
  }

  return (
    <table className="grid">
      <thead className="u-display-contents">
        <tr className="u-display-contents">
          <th className="grid__item grid__item--header">Creditor name</th>
          <th className="grid__item grid__item--header grid__item--numerical">Loan amount</th>
          <th className="grid__item grid__item--header grid__item--numerical">Monthly fees</th>
          <th className="grid__item grid__item--header grid__item--numerical">
            <span className="helpText" data-text="Annual Percentage Rate">APR</span>
          </th>
          <th className="grid__item"></th>
        </tr>
      </thead>
      <tbody className="u-display-contents">
        {loans.map((loan, index) => (
          <tr key={index} className="u-display-contents">
            <td className="grid__item">{loan.creditor}</td>
            <td className="grid__item grid__item--numerical">{localeCurrency(loan.amount)}</td>
            <td className="grid__item grid__item--numerical">{localeCurrency(loan.fee)}</td>
            <td className="grid__item grid__item--numerical">{localePercent(loan.apr)}</td>
            <td className="grid__item">
              <button
                onClick={() => dispatch(removeLoan(index))}
                className="button button--danger button--small"
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
        <tr className="u-display-contents">
          <td colSpan="5" className="u-display-contents">
            <LoanForm />
          </td>
        </tr>
      </tbody>
      <tfoot className="u-display-contents">
        <tr className="u-display-contents">
          <td className="grid__item grid__item--footer">Total</td>
          <td className="grid__item grid__item--footer grid__item--numerical">{localeCurrency(totalAmount())}</td>
          <td className="grid__item grid__item--footer grid__item--numerical">{localeCurrency(totalFee())}</td>
          <td className="grid__item grid__item--footer grid__item--numerical">{localePercent(totalAPR())}</td>
          <td className="grid__item"></td>
        </tr>
      </tfoot>
    </table>
  );
}

export default Loans;
