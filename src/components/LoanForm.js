import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLoan } from './loans/loansSlice';

function LoanForm() {
  const dispatch = useDispatch();
  const [creditor, setCreditor] = useState('');
  const [amount, setAmount] = useState();
  const [fee, setFee] = useState();
  const [apr, setApr] = useState();

  const handleSubmit = function(e) {
    e.preventDefault();
    dispatch(addLoan({ creditor, amount, fee, apr }));
    e.target.reset();
  }

  const handleReset = function() {
    setCreditor('');
    setAmount();
    setFee();
    setApr();
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
            placeholder="0"
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
            placeholder="0"
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
            placeholder="0"
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
