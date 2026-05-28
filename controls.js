export function setupControls() {
  const list = document.querySelector("#pokemon-list");
  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search-input");

  let selectedIndex = 0;

  function getCards() {
    return list ? Array.from(list.children) : [];
  }

  function selectCard(index) {
    const cards = getCards();
    if (!cards.length) return;
    selectedIndex = Math.max(0, Math.min(index, cards.length - 1));
    cards[selectedIndex].scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  const actions = {
    Up:    () => list?.scrollBy({ top: -100, behavior: "smooth" }),
    Down:  () => list?.scrollBy({ top: 100, behavior: "smooth" }),
    Left:  () => selectCard(selectedIndex - 1),
    Right: () => selectCard(selectedIndex + 1),
    A:     () => searchForm?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })),
    B:     () => {
      if (searchInput) {
        searchInput.value = "";
        searchInput.focus();
      } else {
        history.back();
      }
    },
  };

  ["Up", "Down", "Left", "Right", "A", "B"].forEach((btn) => {
    document
      .querySelector(`[aria-label="${btn}"]`)
      ?.addEventListener("click", actions[btn]);
  });
}
