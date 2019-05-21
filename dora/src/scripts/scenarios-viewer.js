import firebase from "./scripts/Dora";

function buildLessonTree(lessonId) {
  let lessonTree = { scenarios: {} };

  let lesson;
  firebase
    .firestore()
    .collection("sole_jr_comp_app_lessons")
    .where("id", "==", lessonId)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        lesson = doc.data();
      }
    });

  let scenarios = [];
  firebase
    .firestore()
    .collection("Scenarios")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        scenarios: [...scenarios, doc];
      });
    });

  lesson.scenariosInLesson.foreach(function(scenarioId) {
    let next_scenario = scenarioId;
    while (next_scenario != null) {}
  });

  return lessonTree;
}

function DFS(node) {
  // Create a Stack and add our initial node in it
  let s = new Stack();
  let explored = new Set();
  s.push(node);

  // Mark the first node as explored
  explored.add(node);

  // We'll continue till our Stack gets empty
  while (!s.isEmpty()) {
    let t = s.pop();

    // Log every element that comes out of the Stack
    console.log(t);

    // 1. In the edges object, we search for nodes this node is directly connected to.
    // 2. We filter out the nodes that have already been explored.
    // 3. Then we mark each unexplored node as explored and push it to the Stack.
    this.edges[t]
      .filter(n => !explored.has(n))
      .forEach(n => {
        explored.add(n);
        s.push(n);
      });
  }
}
