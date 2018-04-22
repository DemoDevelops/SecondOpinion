let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');
inputElement.addEventListener('change', (e) => {
  imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);

imgElement.onload = async function () {
  let example = tf.fromPixels(imgElement);
  let resized = tf.image.resizeBilinear(example, [128, 128], true);
  let img = tf.reshape(resized, [1, 128, 128, 3]);
  let casted = tf.cast(img, 'float32');
  console.dir(casted);
  // console.log(example);
  const model = await tf.loadModel("./CNN_Model/model/model.json");
  let result = model.predict(casted);
  result.print();
  console.dir(result.as1D().argMax().get(0));
};