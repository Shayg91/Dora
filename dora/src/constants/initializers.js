export const INITIAL_STATE_ACTION = {
  effect: "Smile",
  textOrWav: "",
  whatToPlay: ""
};

export const INITIAL_STATE_ANSWER = {
  expectedAnswer: {
    input: "",
    successRating: 75
  },
  typeOfWaiting: 1,
  typeOfInput: "speech"
};

export const INITIAL_STATE_SUCCESS = {
  action: {
    effect: "Smile",
    textOrWav: "",
    whatToPlay: ""
  },
  nextScenarioID: ""
};

export const INITIAL_STATE_FAILURE = {
  action: {
    effect: "Smile",
    textOrWav: "",
    whatToPlay: ""
  },
  nextScenarioID: ""
};

export const INITIAL_STATE_SCENARIO = {
  name: "",
  level: 1,
  actions: [],
  waitFor: INITIAL_STATE_ANSWER,
  onSuccess: INITIAL_STATE_SUCCESS,
  onfailure: INITIAL_STATE_FAILURE
};

export const INITIAL_STATE_LESSON = {
  title: "",
  category: "",
  goals: [],
  scenariosInLesson: []
};

export const INITIAL_STATE_LOGIN = {
  email: "",
  password: "",
  error: null
};

export const INITIAL_STATE_SIGNUP = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};
