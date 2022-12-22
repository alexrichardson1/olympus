from slither_plugin.detectors.low_level_calls import LowLevelCalls
from slither_plugin.detectors.modifiers import Modifiers
from slither_plugin.detectors.erc20 import ERC20
from slither_plugin.detectors.erc721 import ERC721
from slither_plugin.detectors.address import Address


def make_plugin():
    plugin_detectors = [Address, ERC20, ERC721, Modifiers, LowLevelCalls]
    plugin_printers = []
    return plugin_detectors, plugin_printers
