
export const elementToText = element => {
  let text = "";
  if (element.props && element.props.children) {
    if (element.props.children instanceof Array) {
      for (const child of element.props.children) {
        if (typeof child === "string") {
          text += child + '\n';
        } else {
          text += elementToText(child);
        }
      }
    } else {
      if (typeof element.props.children === "string") {
        text += element.props.children + '\n';
      } else {
        text += elementToText(element.props.children);
      }
    }
  }
  return text;
};