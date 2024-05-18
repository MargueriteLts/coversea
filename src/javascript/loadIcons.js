function importAll(r) {
  let icons = {};
  r.keys().forEach((key) => {
    const iconName = key.replace('./', '').replace(/\.[^/.]+$/, ''); // Remove './' and the file extension
    icons[iconName] = r(key);
  });
  return icons;
}

const icons = importAll(require.context('../images/ui/icons', false, /\.(png|jpe?g|svg)$/));

export default icons;
