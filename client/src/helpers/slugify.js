export const lowSlugify = (slug) => {
    const slugified = slug.replace(/\s/g, ' ', "-")
    // console.log('sluged: ', slugified)
    return slugified
}
export const unSlugify = (slug) => {
    const unSlugified = slug.replace(/\s/g, '-', " ")
    // console.log('sluged: ', unSlugified)
    return unSlugified
}

export const slugify = string => {
  const a =
    "àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;";
  const b =
    "aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

    return (
    string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, "-and-") // Replace & with 'and'
      // eslint-disable-next-line
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters
      // eslint-disable-next-line
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      // eslint-disable-next-line
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, "")
  ); // Trim - from end of text
}

