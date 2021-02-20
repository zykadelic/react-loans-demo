import { useState } from 'react';
import LoanForm from './LoanForm';

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
    // just be an unnecessary extra calculation
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

  return (
    <table className="Loans">
      <thead>
        <tr>
          <th>Creditor Name</th>
          <th>Loan amount</th>
          <th>Monthly fees</th>
          <th>APR</th>
        </tr>
      </thead>
      <tbody>
        {loans.map((loan, index) => (
          <tr key={index}>
            <td>{loan.creditor}</td>
            <td>{loan.amount} kr</td>
            <td>{loan.fee} kr</td>
            <td>{loan.apr}%</td>
          </tr>
        ))}
        <tr>
          <td colSpan="4">
            <LoanForm addLoan={addLoan} />
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Total:</td>
          <td>{totalAmount()} kr</td>
          <td>{totalFee()} kr</td>
          <td>{totalAPR()}%</td>
        </tr>
      </tfoot>
    </table>
  );
}

export default Loans;
