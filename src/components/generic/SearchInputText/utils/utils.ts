export const convertSearchSelectValue = (optionValue: string): null | false | true => {
    switch (optionValue) {
        case("All"): {
            return null
        }
        case("Followers"): {
            return true
        }
        case("Not followers"): {
            return false
        }
        default:
            return null
    }
};
