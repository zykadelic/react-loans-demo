import { useState } from 'react';

function LoanForm(props) {
  const [creditor, setCreditor] = useState('');
  const [amount, setAmount] = useState(0);
  const [fee, setFee] = useState(0);
  const [apr, setApr] = useState(0);

  const handleSubmit = function(e) {
    e.preventDefault();
    props.addLoan({ creditor, amount, fee, apr });
    e.target.reset();
  }

  const handleReset = function() {
    setCreditor('');
    setAmount(0);
    setFee(0);
    setApr(0);
  }

  return (
    <form className="u-display-contents" onSubmit={handleSubmit} onReset={handleReset}>
      <label htmlFor="creditor" className="grid__item field">
        <span className="field__label">Creditor</span>
        <span className="field__inputWrapper">
          <input
            type="text"
            id="creditor"
            placeholder="Creditor name"
            value={creditor}
            onChange={e => setCreditor(e.target.value)}
            className="field__input"
            required
          />
        </span>
      </label>

      <label htmlFor="amount" className="grid__item grid__item--numerical field">
        <span className="field__label">Loan amount</span>
        <span className="field__inputWrapper">
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="field__input"
            required
          />
          <span className="field__suffix">kr</span>
        </span>
      </label>

      <label htmlFor="fee" className="grid__item grid__item--numerical field">
        <span className="field__label">Monthly fees</span>
        <span className="field__inputWrapper">
          <input
            type="number"
            id="fee"
            value={fee}
            onChange={e => setFee(e.target.value)}
            className="field__input"
            required
          />
          <span className="field__suffix">kr</span>
        </span>
      </label>

      <label htmlFor="apr" className="grid__item grid__item--numerical field">
        <span className="field__label">APR</span>
        <span className="field__inputWrapper">
          <input
            type="number"
            id="apr"
            step="0.01"
            value={apr}
            onChange={e => setApr(e.target.value)}
            className="field__input"
            required
          />
          <span className="field__suffix">%</span>
        </span>
      </label>

      <div className="grid__item">
        <button type="submit" className="button button--primary">Add</button>
      </div>
    </form>
  )
}

export default LoanForm;
