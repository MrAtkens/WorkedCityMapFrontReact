import { MainMap, PinView }  from './containers'

const dashboardRoutes = [
    {
        path: "map",
        layout: "/",
        name: "MainMap",
        component: MainMap,
    },
    {
        path: "map/pin/:id",
        layout: "/",
        name: "PinView",
        component: PinView
    }
  ];
  
  export default dashboardRoutes;
  