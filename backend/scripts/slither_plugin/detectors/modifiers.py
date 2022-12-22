"""
Detects if a contract implements ERC20 token standard.
"""

from slither.detectors.abstract_detector import AbstractDetector, DetectorClassification


def is_visible(function) -> bool:
    """
    Checks if the function is visilbe outside of the contract scope.

    Args:
        function: Smart contract function.
    Returns:
        If the function is visible or not.
    """
    visibility = function.visibility
    return visibility == "public" or visibility == "external"


drachma = {"mint(address,uint256)": ["onlyRole(bytes32)"]}
game = {"withdraw(uint256)": ["onlyOwner()"]}
hermes = {"addListing(uint256,uint256,uint256)": ["whenNotPaused()"],
          "removeListing(uint256)": ["whenNotPaused()"],
          "borrow(uint256)": ["whenNotPaused()"],
          "liquidate(uint256)": ["whenNotPaused()"],
          "claim(uint256)": ["whenNotPaused()"],
          "updatePrices(uint256[] memory, uint256[] memory)": ["onlyOwner()"],
          "emergencyWithdraw(uint256)": ["onlyOwner()", "whenPaused()"],
          "pause()": ["onlyOwner()", "whenNotPaused()"],
          "unpause()": ["onlyOwner()", "whenPaused()"]
          }
market = {"addListing(uint256,uint256)": ["whenNotPaused()"],
          "changeSellingPrice(uint256)": ["whenNotPaused()"],
          "removeListing(uint256)": ["whenNotPaused()"],
          "buy(uint256)": ["whenNotPaused()"],
          "withdraw(uint256)": ["whenNotPaused()"],
          "emergencyWithdraw(uint256)": ["onlyOwner()", "whenPaused()"],
          "pause()": ["onlyOwner()", "whenNotPaused()"],
          "unpause()": ["onlyOwner()", "whenPaused()"]
          }
pandora = {"claim(uint256,bytes,uint256)": ["nonReentrant()", "whenNotPaused()"],
           "pause()": ["onlyOwner()", "whenNotPaused()"],
           "unpause()": ["onlyOwner()", "whenPaused()"]
           }

contracts_with_mods = {
    "Drachma": drachma,
    "Game": game,
    "Hermes": hermes,
    "Market": market,
    "Pandora": pandora,
}


class Modifiers(AbstractDetector):
    """
    Detect addresses that are not validated
    """

    ARGUMENT = "modifiers"
    HELP = "Modifiers are missing"
    IMPACT = DetectorClassification.HIGH
    CONFIDENCE = DetectorClassification.HIGH

    WIKI = "https://consensys.github.io/smart-contract-best-practices/development-recommendations/solidity-specific/modifiers-as-guards/"
    WIKI_TITLE = "Modifiers as Guards"
    WIKI_DESCRIPTION = ".."
    WIKI_EXPLOIT_SCENARIO = ".."
    WIKI_RECOMMENDATION = ".."

    def _detect(self):
        results = []

        for contract in self.slither.contracts:
            if contract.name not in contracts_with_mods:
                continue

            info = []
            kvs = contracts_with_mods[contract.name]

            for f in contract.functions:
                if f.is_constructor:
                    continue

                if f.full_name in kvs and is_visible(f):
                    mods = [m.full_name for m in f.modifiers]
                    for mod in kvs[f.full_name]:
                        if mod not in mods:
                            info.append(
                                f"{contract.name}.{f.full_name} is missing the modifier {mod}!\n")
            res = self.generate_result(info)
            results.append(res)

        return results
