// This function is used to observe the element passed and when it's intersecting with the viewport, it will call the callback function.
const observeElement = ($element, callback) => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        callback();
      });
    },
    { rootMargin: '0px 0px 250px 0px' }
  );

  observer.observe($element);
};
export default observeElement;
