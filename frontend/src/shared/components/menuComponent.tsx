
import React, { useEffect, useState } from 'react';
import { MenuPresenter } from './menuPresenter';
import { MenuViewModel } from './menuViewModel';
import { Link } from 'react-router-dom';

interface MenuComponentProps {
  presenter: MenuPresenter;
}

export const MenuComponent = ({ presenter }: MenuComponentProps) => {
  
  /**
   * The presenter itself is responsible for creating the view model
   * in the shape that it's supposed to be in for the menu, but it's not responsible
   * for being something that React can watch and observe.
   * 
   * React has to watch and observe things which are within its own control center.
   * When you use `useState` on some data, you're placing data within React's control center 
   * so that it can perform work once that data changes (the work we're referring to is) updating the
   * UI of course.
   * 
   * So until we do this - until we actually give React the data we want it to become `reactive` to, it
   * simply won't re-render. This is how we connect our PURE code (nothing to do with the UI) to
   * the UI.
   * 
   * We can keep these various levels of technical Hows (concerns) far away from each other
   * for testing.
   */

  const [viewModel, setViewModel] = useState<MenuViewModel>();

  useEffect(() => {
    presenter.load((vm) => setViewModel(vm))
  }, [presenter]);

  return (
    <div className='menu'>
      {viewModel && viewModel.isLoggedIn() ? (
        <span>
          <span>{viewModel.getFormattedUsername()} / </span>
          <span>Logout</span>
        </span>
      ) : (
        <Link to={'/register'}>Register</Link>
      )}
    </div>
  );
};