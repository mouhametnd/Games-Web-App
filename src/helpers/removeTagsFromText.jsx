// This function is used to remove the tags from the text passed.
const removeTagsFromText = text => text && text.replace(/<[^>]*>/g, '');
export default removeTagsFromText;
