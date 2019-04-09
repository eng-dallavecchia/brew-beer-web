let browserRouter;

export const setBrowserRouter = _browserRouter => {
    browserRouter = _browserRouter;
};

export const push = route => {
    if(browserRouter.history.location.pathname !== route){
        browserRouter.history.push(route);
    }
};

export default {
    setBrowserRouter,
    push
}