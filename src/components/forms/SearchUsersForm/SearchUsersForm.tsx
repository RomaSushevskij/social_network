import SearchInputText from "../../generic/SearchInputText/SearchInputText";
import {Button} from "../../generic/Button/Button";
import React, {useEffect} from "react";
import {useFormik} from "formik";
import style from "./SearchUsersForm.module.scss"
import Select from "../../generic/Select/Select";
import {convertSearchSelectValue} from "../../generic/SearchInputText/utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {
    getUsers,
    SearchUsersFilterType,
    setCurrentPage,
    setSearchFilter
} from "../../../redux/redusers/usersReducer/usersReducer";
import {getPageSizeSelector} from "../../../redux/selectors/usersSelectors";

export type FormValuesType = {
    term: string,
    friend: string
};

export const SearchUsersForm = () => {
    const dispatch = useDispatch();

    const pageSize = useSelector(getPageSizeSelector);
    const searchedUsers = ["All", "Followers", "Not followers"];

    const formik = useFormik({
        initialValues: {
            term: "",
            friend: "All"
        },
        onSubmit: (values: FormValuesType) => {
            const correctValues = {...values, friend: convertSearchSelectValue(values.friend)};
            dispatch(getUsers(pageSize, 1, correctValues));
            dispatch(setCurrentPage(1));
        }
    });
    const onSelectChange = (optionValue: string) => {
        const values: SearchUsersFilterType = {
            term: formik.values.term,
            friend: convertSearchSelectValue(optionValue),
        }
        dispatch(getUsers(pageSize, 1, values))
        dispatch(setCurrentPage(1));
    }
    useEffect(() => {
        dispatch(setSearchFilter({term: "", friend: null}));
        dispatch(setCurrentPage(1));
    }, [])
    return (
        <form onSubmit={formik.handleSubmit} className={style.form}>
            <SearchInputText placeholder="Search users..." {...formik.getFieldProps("term")}/>
            <div className={style.selectBlock}>
                <Select onChangeOption={onSelectChange} options={searchedUsers} {...formik.getFieldProps("friend")}/>
            </div>
            <Button type="submit" name="Search"/>
        </form>
    )
}