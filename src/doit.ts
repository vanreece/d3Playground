async function doit() {
    const selection = d3.select("#wrapper");
    const div = selection.append("div");
    const ol = div.append("ol");
    ol
        .append("li")
        .html("Hi there");
    ol
        .append("li")
        .html("Nice to meet you");
  
    console.log("hi");
}
  
doit();