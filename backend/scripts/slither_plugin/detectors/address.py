"""
Detects if address parameters have been validated.
"""

from slither.detectors.abstract_detector import AbstractDetector, DetectorClassification


class Address(AbstractDetector):
    """
    Detect addresses that are not validated
    """

    ARGUMENT = "address"
    HELP = "Address is not used in a require or assert statement"
    IMPACT = DetectorClassification.INFORMATIONAL
    CONFIDENCE = DetectorClassification.MEDIUM

    WIKI = "https://consensys.github.io/smart-contract-best-practices/development-recommendations/token-specific/zero-address/"
    WIKI_TITLE = "Zero Address"
    WIKI_DESCRIPTION = ".."
    WIKI_EXPLOIT_SCENARIO = ".."
    WIKI_RECOMMENDATION = ".."

    def _detect(self):
        results = []

        for contract in self.slither.contracts:
            for f in contract.functions:
                for parameter in f.parameters:
                    if parameter.type.__str__() == "address":
                        if not f.is_reading_in_require_or_assert(parameter):
                            info = [
                                f"{contract.name}.{f.full_name} does not validate address!\n"]
                            res = self.generate_result(info)
                            results.append(res)

        return results
