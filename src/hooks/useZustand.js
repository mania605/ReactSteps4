
import {create} from 'zustand'

                          // =create(()=>{ return ();  });
export const useZustandStore= create((set)=>({
IsModal:false,
IsMenu: false,
setModalOpen: ()=> set({IsModal:true}),
setModalClose: ()=> set({IsModal:false}),
setMenuClose: ()=> ({IsMenu: false}),
setMenuToggle: ()=> set(state =>({IsMenu: !state.IsMenu}))
}));

 