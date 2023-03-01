import DateInput from '@/components/DateInput.vue'
import { shallowMount } from '@vue/test-utils'

describe('DateInput', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DateInput, {
      propsData: {
        selectedDate: new Date(2018, 2, 24),
        format: 'DD MMM YYYY',
        language: 'en'
      }
    })
  })

  it('should render correct contents', () => {
    expect(wrapper.findAll('input')).toHaveLength(1)
  })

  it('nulls date', async () => {
    wrapper.setProps({
      selectedDate: null
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.formattedValue).toBeNull()
    expect(wrapper.find('input').element.value).toEqual('')
  })

  it('formats date', () => {
    expect(wrapper.vm.formattedValue).toEqual('24 Mar 2018')
    expect(wrapper.find('input').element.value).toEqual('24 Mar 2018')
  })

  it('delegates date formatting', async () => {
    wrapper.setProps({
      selectedDate: new Date(2016, 1, 15),
      format: () => '2016/1/15'
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.formattedValue).toEqual('2016/1/15')
    expect(wrapper.find('input').element.value).toEqual('2016/1/15')
  })

  it('emits showCalendar', () => {
    wrapper.vm.showCalendar()
    expect(wrapper.emitted().showCalendar).toBeTruthy()
  })

  it('adds bootstrap classes', async () => {
    wrapper.setProps({
      bootstrapStyling: true
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('input').element.classList).toContain('form-control')
  })

  it('appends bootstrap classes', async () => {
    wrapper.setProps({
      inputClass: 'someClass',
      bootstrapStyling: true
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('input').element.classList).toContain('form-control')
    expect(wrapper.find('input').element.classList).toContain('someClass')
  })

  it('can be disabled', async () => {
    wrapper.setProps({
      disabled: true
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('input').attributes().disabled).toBeDefined()
  })

  it('accepts a function as a formatter', () => {
    wrapper.setMethods({
      format: () => '!'
    })
    expect(wrapper.find('input').element.value).toEqual('!')
  })

  it('triggers closeCalendar on blur', () => {
    wrapper.find('input').trigger('blur')
    expect(wrapper.emitted('closeCalendar')).toBeTruthy()
  })

  it('should open the calendar on focus', () => {
    wrapper.setProps({
      showCalendarOnFocus: true
    })
    wrapper.find('input').trigger('focus')
    expect(wrapper.emitted().showCalendar).toBeTruthy()
  })
})
