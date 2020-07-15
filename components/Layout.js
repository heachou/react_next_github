import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Input, Menu, Tooltip, Avatar, Button, Dropdown } from 'antd'
import { GithubOutlined, UserOutlined } from '@ant-design/icons'
import getConfig from 'next/config'
import Link from 'next/link'
import { withRouter } from 'next/router'
import Container from './Container'
import { logout } from '../store/actionCreatores'

const { Header, Content, Footer } = Layout
const { publicRuntimeConfig } = getConfig()

const githubIconStyle = {
  color: 'white',
  fontSize: 40,
  display: 'block',
  paddingTop: 10,
  marginRight: 20
}

const AppLayout = ({ children, router }) => {

  const [search, setSearch] = useState('')
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const handleSearchChange = useCallback((event) => {
    setSearch(event.target.value)
  }, [setSearch])

  const handleOnSearch = () => {
    router.push(`/search?query=${search}`)
  }
  const handleLogout = () => {
    dispatch(logout())
  }

  const UserDropDown = (
    <Menu>
      <Menu.Item>
        <Button onClick={handleLogout} type="link">登出</Button>
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Link href="/">
                <a>
                  <GithubOutlined className="icon-github" style={githubIconStyle} />
                </a>
              </Link>
            </div>
            <div>
              <Input.Search
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
                value={search}
                placeholder="搜索仓库"
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {user.id ? (
                <Dropdown overlay={UserDropDown}>
                  <a href={user.html_url} target="blank">
                    <Avatar size={40} src={user.avatar_url} />
                  </a>
                </Dropdown>
              ) : (
                  <Tooltip placement="bottom" title="点击进行登录">
                    <a href={`/prepare-auth?url=${router.asPath}`}>
                      <Avatar size={40} icon={<UserOutlined />} />
                    </a>
                  </Tooltip>
                )}
            </div>
          </div>
        </Container>
      </Header>
      <Container renderer={<Content />}>
        {children}
      </Container>
      <Footer style={{ textAlign: 'center' }}>
        develop by zhou @<a href="mailto:1244239990@qq.com">me</a>
      </Footer>
      <style jsx>{`
            .header-inner{
                display: flex;
                justify-content:space-between;
             }
            .header-left{
                display:flex;
                justify-content:flex-start;
            }
            `}</style>
      <style jsx global>{`
              #__next{
                  height:100%;
              }
              .ant-layout{
                min-height:100vh;
              }
              .ant-layout-header{
                padding-left:0;
                padding-right:0;
              }
              .ant-layout-content {
                background: #fff;
              }
            `}</style>
    </Layout>
  )
}

export default withRouter(AppLayout)