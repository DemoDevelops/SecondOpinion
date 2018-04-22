let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');
inputElement.addEventListener('change', (e) => {
  imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);

function round(number, precision) {
  var shift = function (number, precision, reverseShift) {
    if (reverseShift) {
      precision = -precision;
    }
    var numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
}

function displayResults(result){
  console.log('here');
  let table = document.getElementById('results');
  let rows = table.getElementsByTagName('td');
  let max = result.as1D().argMax().get(0);
  
  for(let i = 0 ; i < rows.length ; i++){
    console.log(rows[i].parentElement);
    rows[i].innerHTML = (result.get(i)*100).toFixed(5);
    rows[i].parentElement.classList.remove("table-success");
    if(max === i){
      rows[i].parentElement.classList.add("table-success");
    }
  }
  table.classList.remove("d-none");
}

imgElement.onload = async function () {
  document.getElementById('results').classList.add("d-none");
  let example = tf.fromPixels(imgElement);
  let resized = tf.image.resizeBilinear(example, [128, 128], true);
  let img = tf.reshape(resized, [1, 128, 128, 3]);
  let casted = tf.cast(img, 'float32');

  const model = await tf.loadModel("./CNN_Model/model/model.json");
  let result = model.predict(casted);
  result.print();
  displayResults(result);
  console.dir(result.as1D().argMax().get(0));
};