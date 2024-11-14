// src/components/TopNav.tsx

import React from "react";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../store";
import { logout } from "../store/authSlice";

const TopNavContainer = styled.div`
  margin-left: 250px;
  height: 60px;
  background-color: #ffffff;
  border-bottom: 1px solid ${(props) => props.theme.colors.neutral.border};
  display: flex;
  align-items: center;
  padding: 0 ${(props) => props.theme.spacing(2)};
  justify-content: space-between;
  position: fixed;
  top: 0;
  right: 0;
  left: 250px;
`;

const SearchBar = styled.input`
  width: 300px;
  padding: ${(props) => props.theme.spacing(1)};
  border: 1px solid ${(props) => props.theme.colors.neutral.border};
  border-radius: 4px;
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const UserName = styled.span`
  margin-left: ${(props) => props.theme.spacing(1)};
  font-size: ${(props) => props.theme.typography.body.fontSize};
`;

const LogoutButton = styled.button`
  margin-left: ${(props) => props.theme.spacing(2)};
  padding: ${(props) => props.theme.spacing(1)};
  border: none;
  background: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.primary.tests};
`;

const TopNav: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state: RootState) => state.auth.userName);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <TopNavContainer>
      <SearchBar type="text" placeholder="Search..." />
      <UserMenu>
        <FaUserCircle size={24} />
        <UserName>{userName || "User"}</UserName>{" "}
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </UserMenu>
    </TopNavContainer>
  );
};

export default TopNav;
