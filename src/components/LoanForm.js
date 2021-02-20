import { useState } from 'react';

function LoanForm(props) {
  const [creditor, setCreditor] = useState('');
  const [amount, setAmount] = useState(0);
  const [fee, setFee] = useState(0);
  const [apr, setApr] = useState(0);

  const handleSubmit = function(e) {
    e.preventDefault();
    props.addLoan({ creditor, amount, fee, apr });
  }

  return (
    <form className="u-tableRow" onSubmit={handleSubmit}>
      <div className="u-tableCell">
        <label htmlFor="creditor">Creditor</label><br />
        <input
          type="text"
          id="creditor"
          value={creditor}
          onChange={e => setCreditor(e.target.value)}
        />
      </div>

      <div className="u-tableCell">
        <label htmlFor="amount">Loan amount</label><br />
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />kr
      </div>

      <div className="u-tableCell">
        <label htmlFor="fee">Monthly fees</label><br />
        <input
          type="number"
          id="fee"
          value={fee}
          onChange={e => setFee(e.target.value)}
        />kr
      </div>

      <div className="u-tableCell">
        <label htmlFor="apr">APR</label><br />
        <input
          type="number"
          id="apr"
          step="0.01"
          value={apr}
          onChange={e => setApr(e.target.value)}
        />%
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default LoanForm;
