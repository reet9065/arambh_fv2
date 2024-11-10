import { useContext } from 'react'
import { SnackbarContext } from '../components/Snackbar/SnackbarProvider';

function usePopupNotificationControler() {

   const snackBar = useContext(SnackbarContext);

   const show = (obj)=>{
    snackBar.handleClick(obj);
   }

  return {show}
}

export default usePopupNotificationControler