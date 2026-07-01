function interpolate(text, context){
    if(!text){
        return text;
    }

     return text.replace(
    /\{\{(.*?)\}\}/g,
    (_, key) => {
      const path = key.trim().split(".");

      let value = context;

      for (const p of path) {
        value = value?.[p];
      }

      return value ?? "";
    }
  );
}

module.exports = interpolate;
