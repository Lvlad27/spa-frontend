// const root = document.getElementById("root");

// function hide(element) {
//   element.classList.add("hidden");
// }
// function show(element) {
//   element.classList.remove("hidden");
// }
// preFillEditUserForm(selectedUserName) {
//   const avatar = document.getElementById("user-avatar");
//   let emailInput = document.getElementById("edit-user-email");
//   let passwordInput = document.getElementById("edit-user-password");
//   const genderInput = document.getElementsByName("gender");
//   const hobbiesInput = document.getElementsByName("hobbies");
//   const countryInput = document.getElementById("edit-user-country");

//   avatar.innerHTML = `<p>${selectedUserName}</p>`;
//   let user = this.DataStorage.getUser(selectedUserName);
//   emailInput.value = user.email;
//   passwordInput.value = user.password;
//   genderInput.forEach((genderInput) => {
//     if (genderInput.value === user.gender) {
//       genderInput.checked = true;
//     }
//   });
//   countryInput.value = user.country;
//   hobbiesInput.forEach((hobbyInput) => (hobbyInput.checked = false));
//   if (user.hobbies) {
//     hobbiesInput.forEach((hobbyInput) => {
//       user.hobbies.forEach((hobby) => {
//         if (hobbyInput.value === hobby) {
//           hobbyInput.checked = true;
//         }
//       });
//     });
//   }
// }

function templateRenderer(template, data) {
  return template.replace(/{{(.*?)}}/g, (match) => {
    return data[match.split(/{{|}}/).filter(Boolean)[0]];
  });
}

function templateRendererWithJS(html, options) {
  var re = /{{(.*?)}}/g,
    reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g,
    code = "with(obj) { var r=[];\n",
    cursor = 0,
    result,
    match;
  var add = function (line, js) {
    js
      ? (code += line.match(reExp) ? line + "\n" : "r.push(" + line + ");\n")
      : (code +=
          line != "" ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : "");
    return add;
  };
  while ((match = re.exec(html))) {
    add(html.slice(cursor, match.index))(match[1], true);
    cursor = match.index + match[0].length;
  }
  add(html.substr(cursor, html.length - cursor));
  code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, " ");
  try {
    result = new Function("obj", code).apply(options, [options]);
  } 
  catch (err) {
    console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n");
  }
  return result;
};

export { templateRendererWithJS };
