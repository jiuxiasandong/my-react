
const defaultState = {
    isLogin: false,
    code: "",
    indexShow: true,
    addShow: true,
    detailShow: true,
    txt: "",
    myList: [],
    newList: [],
    detailList: [],
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case "sendCode":
            return { ...state, ...{ code: action.preload } }
            break;
        case "reg":
            return { ...state };
            break;
        case "log":
            return { ...state };
            break;
        case "getTex":
            return { ...state, ...{ txt: action.txt } };
            break;
        case "addDiary":
            return { ...state };
            break;
        case "getMydiary":
            return { ...state, ...{ myList: action.data } };
            break;
        case "getNewDiary":
            return { ...state, ...{ newList: action.data } };
            break;
        case "showIcon":
            return { ...state, ...{ indexShow: action.indexShow, addShow: action.addShow, detailShow: action.detailShow } };
            break;
        case "search":
            return { ...state, ...{ myList: action.data } };
            break;
        case "deleteItemById":
            return { ...state, ...{ myList: action.data } };
            break;
        case "getDetail":
            return { ...state, ...{ detailList: action.data } };
            break;
        default:
            return state;
            break;
    }
}