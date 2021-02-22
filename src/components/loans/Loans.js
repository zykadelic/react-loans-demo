import { useState } from 'react';
import { localeCurrency, localePercent } from '../../shared/utilities';
import LoanForm from '../LoanForm';

function Loans() {
  const [loans, setLoans] = useState([
    // sample data:
    // {
    //   creditor: 'Ikanobanken',
    //   amount: 36000,
    //   fee: 50,
    //   apr: 7.54
    // }, {
    //   creditor: 'Brocc',
    //   amount: 150000,
    //   fee: 0,
    //   apr: 5.2
    // }
  ]);

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

  const addLoan = function({ creditor, amount, fee, apr }) {
    // the "+amount" etc is a number typecast, regardless if it's an int or a float,
    // so it's not stored as a string
    setLoans(loans.concat({
      creditor,
      amount: +amount,
      fee: +fee,
      apr: +apr
    }));
  }

  const removeLoan = function(index) {
    let newLoans = [...loans]; // copy array
    newLoans.splice(index, 1); // delete element
    setLoans(newLoans);
  }

  return (
    <table className="grid">
      <thead className="u-display-contents">
        <tr className="u-display-contents">
          <th className="grid__item grid__item--header">Creditor name</th>
          <th className="grid__item grid__item--header grid__item--numerical">Loan amount</th>
          <th className="grid__item grid__item--header grid__item--numerical">Monthly fees</th>
          <th className="grid__item grid__item--header grid__item--numerical">APR</th>
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
                onClick={removeLoan.bind(this, index)}
                className="button button--danger button--small"
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
        <tr className="u-display-contents">
          <td colSpan="5" className="u-display-contents">
            <LoanForm addLoan={addLoan} />
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
