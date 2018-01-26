import { StyleSheet } from 'aphrodite';

const globalSelectorHandler = (selector, _, generateSubtreeStyles) => {
    if (selector[0] !== "*") {
        return null;
    }

    return generateSubtreeStyles(selector.slice(1));
};

const globalExtension = {selectorHandler: globalSelectorHandler};
export default StyleSheet.extend([globalExtension]);

// export default {
//   GlobalStyleSheet,
//   GlobalCss
// };
