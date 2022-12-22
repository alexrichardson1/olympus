"""
Detects if the return value of a low level call has been handled.
"""

from slither.detectors.abstract_detector import AbstractDetector, DetectorClassification


class LowLevelCalls(AbstractDetector):
    """
    Detect if low call return values were handled
    """

    ARGUMENT = "low_calls"
    HELP = "External call return value was not handled"
    IMPACT = DetectorClassification.HIGH
    CONFIDENCE = DetectorClassification.MEDIUM

    WIKI = "https://consensys.github.io/smart-contract-best-practices/development-recommendations/general/external-calls/#handle-errors-in-external-calls"
    WIKI_TITLE = "Handle errors in external calls"
    WIKI_DESCRIPTION = ".."
    WIKI_EXPLOIT_SCENARIO = ".."
    WIKI_RECOMMENDATION = ".."

    def _detect(self):
        results = []

        for contract in self.slither.contracts:
            info = [f"{contract.name}\n"]
            for function in contract.functions:
                ls = function.low_level_calls
                if not ls:
                    continue
                for l in ls:
                    v = l[0]
                    if not function.is_reading_in_require_or_assert(v):
                        info.append(
                            f"  {contract.name}.{function.name} does not handle return value of low level call\n")
                        res = self.generate_result(info)
                        results.append(res)
        return results
