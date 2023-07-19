let isBoolean = true;

const Logic = () => {
  let Player_One = "X";
  let Player_Two = "O";
  if (isBoolean) {
    isBoolean = false;
    return Player_One;
  } else {
    isBoolean = true;
    return Player_Two;
  }
};

const Value = (id) => {
  let NewValue = document.getElementById(id);
  NewValue.innerHTML = Logic();
};

const GetID = (TableID) => {
  return TableID;
};
const GetDataCell = () => {
  let DataCell = document.querySelectorAll("td");
  DataCell.forEach((DataCell) => {
    DataCell.addEventListener("click", () => {
      let id = DataCell.id;
      console.log(id);
      Value(id);
    });
  });
};

GetDataCell();
