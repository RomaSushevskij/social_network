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

export const convertSearchSelectValueBack = (optionValue: null | false | true): string => {
    switch (optionValue) {
        case(null): {
            return "All"
        }
        case(true): {
            return "Followers"
        }
        case(false): {
            return "Not followers"
        }
        default:
            return "All"
    }
};
