import React from 'react';
import { shallow } from 'enzyme';
import Signup from '../signup';

describe('Signup', () => {
  let wrapper;
  const mockNavigate = jest.fn();
  const mockFetch = jest.fn();
  const mockSetItem = jest.fn();

  beforeAll(() => {
    global.fetch = mockFetch;
    global.sessionStorage = { setItem: mockSetItem };
    global.window = { location: { pathname: '' } };
  });

  beforeEach(() => {
    wrapper = shallow(<Signup />);
    wrapper.setProps({ navigate: mockNavigate });
  });

  afterEach(() => {
    mockFetch.mockClear();
    mockSetItem.mockClear();
    mockNavigate.mockClear();
  });

  it('should call fetch and navigate on submit', async () => {
    mockFetch.mockResolvedValueOnce({ status: 200 });

    await wrapper.find('form').simulate('submit', { preventDefault() {} });

    expect(mockFetch).toHaveBeenCalled();
    expect(mockSetItem).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should display an alert when account is successfully created', async () => {
    mockFetch.mockResolvedValueOnce({ status: 200 });

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    await wrapper.find('form').simulate('submit', { preventDefault() {} });

    expect(alertSpy).toHaveBeenCalledWith('Successfully created account.');
    alertSpy.mockRestore();
  });

  it('should call login function after successful sign up', async () => {
    const mockLogin = jest.spyOn(wrapper.instance(), 'login');
    mockFetch.mockResolvedValueOnce({ status: 200 });

    await wrapper.find('form').simulate('submit', { preventDefault() {} });

    expect(mockLogin).toHaveBeenCalled();
    mockLogin.mockRestore();
  });

  it('should redirect to login page after successful sign up', async () => {
    mockFetch.mockResolvedValueOnce({ status: 200 });

    await wrapper.find('form').simulate('submit', { preventDefault() {} });

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});